import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  meta: Record<string, any>;
}

export function apiSuccess<T>(data: T, meta: Record<string, any> = {}, status = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    error: null,
    meta,
  };
  return NextResponse.json(response, { status });
}

export function apiError(error: string, status = 400, meta: Record<string, any> = {}) {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    error,
    meta,
  };
  return NextResponse.json(response, { status });
}
