import Icon, { IconProps } from '../components/Icon';

const CloseIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M20 5.61143L18.3886 4L12 10.3886L5.61143 4L4 5.61143L10.3886 12L4 18.3886L5.61143 20L12 13.6114L18.3886 20L20 18.3886L13.6114 12L20 5.61143Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default CloseIcon;
