/**
 * useSuggestions Hook
 * State management for agent suggestions
 * Phase 4: Cloud-Native Kubernetes Deployment
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Suggestion,
  SuggestionCounts,
  SuggestionQueryParams,
  getSuggestions,
  getSuggestionCounts,
  dismissSuggestion as dismissSuggestionApi,
  deleteSuggestion as deleteSuggestionApi,
} from '../services/suggestions.api';

interface UseSuggestionsState {
  suggestions: Suggestion[];
  counts: SuggestionCounts | null;
  total: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

interface UseSuggestionsResult extends UseSuggestionsState {
  fetchSuggestions: (params?: SuggestionQueryParams) => Promise<void>;
  fetchCounts: () => Promise<void>;
  dismissSuggestion: (id: string) => Promise<void>;
  deleteSuggestion: (id: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

const DEFAULT_LIMIT = 10;

export function useSuggestions(
  initialParams: SuggestionQueryParams = {}
): UseSuggestionsResult {
  const [state, setState] = useState<UseSuggestionsState>({
    suggestions: [],
    counts: null,
    total: 0,
    isLoading: false,
    error: null,
    hasMore: false,
  });

  const [currentParams, setCurrentParams] = useState<SuggestionQueryParams>({
    limit: DEFAULT_LIMIT,
    offset: 0,
    ...initialParams,
  });

  const fetchSuggestions = useCallback(
    async (params: SuggestionQueryParams = {}) => {
      const mergedParams = { ...currentParams, ...params };
      setCurrentParams(mergedParams);

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await getSuggestions(mergedParams);
        setState((prev) => ({
          ...prev,
          suggestions:
            mergedParams.offset === 0
              ? response.suggestions
              : [...prev.suggestions, ...response.suggestions],
          total: response.total,
          isLoading: false,
          hasMore: response.offset + response.suggestions.length < response.total,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch suggestions',
        }));
      }
    },
    [currentParams]
  );

  const fetchCounts = useCallback(async () => {
    try {
      const counts = await getSuggestionCounts();
      setState((prev) => ({ ...prev, counts }));
    } catch (error) {
      console.error('Failed to fetch suggestion counts:', error);
    }
  }, []);

  const dismissSuggestion = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await dismissSuggestionApi(id);
      setState((prev) => ({
        ...prev,
        suggestions: prev.suggestions.map((s) =>
          s.id === id ? { ...s, dismissed: true } : s
        ),
        isLoading: false,
      }));
      // Refresh counts after dismissing
      fetchCounts();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to dismiss suggestion',
      }));
    }
  }, [fetchCounts]);

  const deleteSuggestion = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await deleteSuggestionApi(id);
      setState((prev) => ({
        ...prev,
        suggestions: prev.suggestions.filter((s) => s.id !== id),
        total: prev.total - 1,
        isLoading: false,
      }));
      // Refresh counts after deleting
      fetchCounts();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to delete suggestion',
      }));
    }
  }, [fetchCounts]);

  const loadMore = useCallback(async () => {
    if (state.isLoading || !state.hasMore) return;

    await fetchSuggestions({
      offset: state.suggestions.length,
    });
  }, [state.isLoading, state.hasMore, state.suggestions.length, fetchSuggestions]);

  const refresh = useCallback(async () => {
    await Promise.all([
      fetchSuggestions({ offset: 0 }),
      fetchCounts(),
    ]);
  }, [fetchSuggestions, fetchCounts]);

  // Initial fetch
  useEffect(() => {
    fetchSuggestions();
    fetchCounts();
  }, []);

  return {
    ...state,
    fetchSuggestions,
    fetchCounts,
    dismissSuggestion,
    deleteSuggestion,
    loadMore,
    refresh,
  };
}

export default useSuggestions;
