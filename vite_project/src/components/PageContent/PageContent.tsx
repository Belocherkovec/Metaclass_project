import cn from 'classnames';
import styles from './pageContent.module.scss';

export type PageContentProps = {
  children: React.ReactNode;
  className?: string;
  isHasBg?: boolean;
};

const PageContent: React.FC<PageContentProps> = ({ children, className, isHasBg, ...props }) => {
  if (isHasBg) {
    return (
      <div className={styles.wrapper}>
        <main className={cn(styles.content, className)} {...props}>
          {children}
        </main>
      </div>
    );
  }
  return (
    <main className={cn(styles.content, className)} {...props}>
      {children}
    </main>
  );
};

export default PageContent;
