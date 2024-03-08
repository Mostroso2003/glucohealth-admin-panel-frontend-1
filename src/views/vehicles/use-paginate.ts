import { useCallback, useEffect, useState } from 'react';
// Own
import { Vehicle } from 'core/vehicles/types';
import getPaginate from 'services/vehicles/get-paginate';
import { PaginateData } from 'services/types';
import { useAppDispatch } from 'store';
import { setIsLoading, setErrorMessage } from 'store/customizationSlice';
import BackendError from 'exceptions/backend-error';

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchVehicles = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({ page, "per-page": paginate.itemsPerPage });
      setVehicles(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, paginate, setPage, fetchVehicles };
}
