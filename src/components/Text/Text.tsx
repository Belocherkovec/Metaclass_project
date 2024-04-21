import { colors } from "consts/";
import styles from "./Text.module.scss";

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Выравнивание **/
    align?: 'left' | 'center' | 'right';
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({className, align, view, tag = 'p', weight, children, color, maxLines}) => {
    const inlineStyles = {
        fontWeight: weight,
        color: color ? colors[color] : undefined,
        textAlign: align ? align : undefined,
        WebkitLineClamp: maxLines, 
        overflow: 'hidden'
    }
    const viewStyle = view ? `${view}` : ''
    const CustomTag = tag
    return(
        <CustomTag className={`${styles.text} ${styles[viewStyle]} ${className}`} style={inlineStyles}>
            {children}
        </CustomTag>
    )
}

export default Text;
