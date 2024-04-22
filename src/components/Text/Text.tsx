import styles from './Text.module.scss';
import cn from 'classnames';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Выравнивание **/
  align?: 'left' | 'center' | 'right';
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  align,
  view = 'p-14',
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  return (
    <Tag
      className={cn(
        className,
        align && styles[align],
        styles[view],
        weight && styles[weight],
        color && styles[color],
        maxLines && styles.text_clamp,
      )}
      style={{ '--lines-count': maxLines } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default Text;
