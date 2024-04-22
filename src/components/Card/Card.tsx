import cn from 'classnames';
import styles from './card.module.scss';
import Text from 'components/Text';

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
  subtitle: React.ReactNode;
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
  cardKey,
}) => {
  return (
    <div className={cn(className, styles.card)} onClick={onClick} key={cardKey}>
      <div className={styles.card__header}>
        <img className={styles.card__image} src={image} alt="card" />
      </div>
      <div className={styles.card__body}>
        {captionSlot && (
          <Text className={styles.card__caption} view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text tag="h4" view="p-20" weight="medium" color="primary" maxLines={2}>
          {title}
        </Text>
        <Text className={styles.card__subtitle} view="p-16" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text className={styles.card__content} view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          <div className={styles.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
