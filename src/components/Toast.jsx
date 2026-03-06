import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const toastConfig = {
    success: { icon: CheckCircle, bg: '#059669', label: 'Success' },
    error: { icon: AlertCircle, bg: '#DC2626', label: 'Error' },
    warning: { icon: AlertTriangle, bg: '#F59E0B', label: 'Warning' },
    info: { icon: Info, bg: '#2563EB', label: 'Info' },
};

const Toast = ({ message, type = 'info', onClose }) => {
    const config = toastConfig[type] || toastConfig.info;
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: '12px',
                backgroundColor: config.bg,
                color: 'white',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                minWidth: '280px',
            }}
        >
            <Icon size={20} />
            <span style={{ flex: 1 }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    opacity: 0.7,
                }}
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

export default Toast;
