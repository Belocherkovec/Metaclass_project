import cn from 'classnames';
import styles from './pageContent.module.scss';

const PageContent = ({ children, className, ...props }: { children: React.ReactNode; className?: string }) => {
  return (
    <main className={cn(styles.content, className)} {...props}>
      {children}
    </main>
  );
};

export default PageContent;
