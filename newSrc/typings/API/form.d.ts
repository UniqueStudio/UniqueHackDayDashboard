export type ToFormData<T> = {
  [K in keyof T]: {
    value?: T[K];
    errors?: Error[];
    dirty?: boolean;
    touched?: boolean;
    validating?: boolean;
  }
};
export interface ToForm<T> {
  data: T;
  isLoading: boolean;
  isSubmitting: boolean;
  error: { value?: string; time?: number };
}
