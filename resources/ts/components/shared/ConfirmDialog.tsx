import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'info'
  warning?: string
}

export function ConfirmDialog({
  open, onClose, onConfirm,
  title, description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'info',
  warning,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      {warning && (
        <div className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-warning-bg mb-4">
          <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-warning">{warning}</p>
        </div>
      )}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
        <Button
          variant={variant === 'danger' ? 'destructive' : 'primary'}
          onClick={() => { onConfirm(); onClose() }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
