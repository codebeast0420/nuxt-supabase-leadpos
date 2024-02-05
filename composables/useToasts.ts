import { Toast } from '@/types/toast.types'

export const useToasts = () => {
    const toasts = useState<Toast[]>('toasts', () => []);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        if (process.server) return

        const lastToast = toasts.value[toasts.value.length - 1];
        const toastId = lastToast ? lastToast.id + 1 : 1;
        toasts.value.push({ id: toastId, ...toast })

        setTimeout(() => {
            removeToast(toastId)
        }, 5000)
    }

    const removeToast = (toastId: number) => {
        const index = toasts.value.findIndex(toast => toast.id === toastId);
        if (index !== -1) {
            toasts.value.splice(index, 1);
        }
    }

    return {
        toasts,
        addToast,
        removeToast
    }
}
