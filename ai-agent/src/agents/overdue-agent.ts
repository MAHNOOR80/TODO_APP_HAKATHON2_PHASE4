/**
 * Overdue Task Agent
 * Monitors tasks for overdue status and creates reminder suggestions
 * Phase 4: Cloud-Native Kubernetes Deployment
 */

import { getPrismaClient } from '../config/database.config';
import { logger } from '../config/logger.config';
import { createSuggestion } from '../services/suggestion-api.service';
import { checkRateLimit } from '../utils/rate-limiter';

const prisma = getPrismaClient();

// Configuration
const BATCH_SIZE = 100;
const OVERDUE_THRESHOLD_DAYS = 0; // Tasks are overdue if past due date

/**
 * Run the overdue task agent
 * Finds overdue tasks and creates suggestions for users with agents enabled
 */
export async function runOverdueAgent(): Promise<void> {
  const startTime = Date.now();
  logger.info('Starting overdue agent run');

  try {
    // Get users with autonomous agents enabled
    const usersWithAgents = await prisma.user.findMany({
      where: { autonomousAgentsEnabled: true },
      select: { id: true },
    });

    if (usersWithAgents.length === 0) {
      logger.info('No users with autonomous agents enabled');
      return;
    }

    const userIds = usersWithAgents.map((u) => u.id);
    logger.info({ userCount: userIds.length }, 'Found users with agents enabled');

    let totalSuggestions = 0;
    let processedTasks = 0;

    // Process users in batches
    for (const userId of userIds) {
      // Check rate limit for this user
      if (!await checkRateLimit(userId)) {
        logger.debug({ userId }, 'Rate limit reached for user, skipping');
        continue;
      }

      // Find overdue tasks for this user
      const overdueTasks = await prisma.task.findMany({
        where: {
          userId,
          completed: false,
          dueDate: {
            lt: new Date(),
          },
        },
        select: {
          id: true,
          title: true,
          dueDate: true,
          priority: true,
        },
        take: BATCH_SIZE,
        orderBy: { dueDate: 'asc' },
      });

      if (overdueTasks.length === 0) {
        continue;
      }

      logger.debug({ userId, taskCount: overdueTasks.length }, 'Found overdue tasks');

      // Create suggestions for overdue tasks
      for (const task of overdueTasks) {
        processedTasks++;

        const daysOverdue = Math.floor(
          (Date.now() - task.dueDate!.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Only suggest for tasks at least 1 day overdue
        if (daysOverdue < 1) {
          continue;
        }

        const message =
          daysOverdue === 1
            ? `Task "${task.title}" is 1 day overdue. Consider updating its due date or marking it complete.`
            : `Task "${task.title}" is ${daysOverdue} days overdue. Consider updating its due date or marking it complete.`;

        const created = await createSuggestion({
          userId,
          taskId: task.id,
          suggestionType: 'overdue_reminder',
          message,
          metadata: {
            daysOverdue,
            taskTitle: task.title,
            taskPriority: task.priority,
            dueDate: task.dueDate?.toISOString(),
          },
        });

        if (created) {
          totalSuggestions++;
        }
      }
    }

    const duration = Date.now() - startTime;
    logger.info(
      {
        duration,
        processedTasks,
        suggestionsCreated: totalSuggestions,
        usersProcessed: userIds.length,
      },
      'Overdue agent run completed'
    );
  } catch (error) {
    logger.error({ error }, 'Overdue agent run failed');
    throw error;
  }
}
