import { useState, useEffect } from 'react';
import { PopupService, PopupData } from '@/services/popupService';

interface UsePopupDataReturn {
  data: PopupData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePopupData = (popupId: string): UsePopupDataReturn => {
  const [data, setData] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const popupData = await PopupService.getPopupData(popupId);
      setData(popupData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch popup data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [popupId]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}; 