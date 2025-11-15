import './Snackbar.css';

export interface SnackbarProps {
  message: string;
  type: 'error' | 'success';
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, type }) => {
  return (
    <div className={`snackbar snackbar-${type}`}>
      {message}
    </div>
  );
};
