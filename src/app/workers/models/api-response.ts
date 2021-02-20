export interface ApiResponse<T> {
  pageNumber: number,
  pageSize: number,
  totalPages: number,
  recordCount: number,
  data: T[]
}
