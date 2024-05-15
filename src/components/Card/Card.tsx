import cn from 'classnames';
import Image from 'components/Image';
import Text from 'components/Text';
import styles from './card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** key для вывода в массиве React **/
  cardKey?: React.Key;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <article className={cn(styles.card, className)} onClick={onClick}>
      <Image className={styles.card__image} src={image} alt="card" />
      <div className={styles.card__body}>
        {captionSlot && (
          <Text className={styles.card__caption} view="p-14" weight="medium" color="secondary" maxLines={1}>
            {captionSlot}
          </Text>
        )}
        <Text tag="h4" className={styles.card__title} view="p-20" weight="medium" color="primary" maxLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text className={styles.card__subtitle} view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        )}
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          <div className={styles.card__action}>{actionSlot}</div>
        </div>
      </div>
    </article>
  );
};

export default Card;
