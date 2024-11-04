import { useSnackbar } from "notistack";
import { useMemo } from "react";

export type SnackbarFn = (message: string) => void;

export type UseSnackBars = {
  showSuccessSnackbar: SnackbarFn;
  showErrorSnackbar: SnackbarFn;
  showInfoSnackbar: SnackbarFn;
  showWarningSnackbar: SnackbarFn;
};

enum VariantTypes {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export const useSnackbars = (): UseSnackBars => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useMemo(() => {
    const showSnackBar =
      (variant: keyof typeof VariantTypes): SnackbarFn =>
      (message) => {
        enqueueSnackbar(message, {
          variant,
        });
      };

    return {
      showSuccessSnackbar: showSnackBar("success"),
      showErrorSnackbar: showSnackBar("error"),
      showInfoSnackbar: showSnackBar("info"),
      showWarningSnackbar: showSnackBar("warning"),
    };
  }, [closeSnackbar, enqueueSnackbar]);
};

export default useSnackbars;
