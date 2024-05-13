import Text from 'components/Text';
import styles from './about.module.scss';

const About = () => {
  return (
    <section className={styles.about}>
      <Text tag="h1" view="title" className={styles.title}>
        About Us
      </Text>
      <Text view="p-20" color="secondary" className={styles.secondary_text}>
        Lalasia E-commerce is an innovative online shopping platform that leverages cutting-edge technology to offer a
        seamless shopping experience for its users. Built using React, a popular JavaScript library for building user
        interfaces, Lalasia E-commerce delivers a dynamic and responsive interface that ensures smooth navigation and
        interaction.
      </Text>
      <Text view="p-20" color="secondary" className={styles.secondary_text}>
        One of the key features of Lalasia E-commerce is its integration with Platzi Fake Store, a simulated e-commerce
        platform provided by Platzi, a renowned online education platform. By utilizing the data and functionalities of
        Platzi Fake Store, Lalasia E-commerce is able to showcase a wide range of products across various categories,
        providing users with an extensive selection to choose from.
      </Text>
      <Text view="p-20" color="secondary" className={styles.secondary_text}>
        The collaboration with Platzi Fake Store not only enriches the product catalog of Lalasia E-commerce but also
        ensures the authenticity and quality of the products available on the platform. Users can browse through diverse
        product listings, ranging from electronics and fashion to home essentials, with confidence in the reliability of
        the offerings.
      </Text>
      <Text view="p-20" color="secondary" className={styles.secondary_text}>
        Furthermore, Lalasia E-commerce prioritizes user experience by implementing intuitive search and filtering
        options, enabling customers to quickly find their desired products. The platform also incorporates secure
        payment gateways, guaranteeing safe and hassle-free transactions for shoppers.
      </Text>
      <Text view="p-20" color="secondary" className={styles.secondary_text}>
        With its fusion of React technology and Platzi Fake Store integration, Lalasia E-commerce sets itself apart as a
        dynamic and trustworthy online marketplace, catering to the needs and preferences of modern consumers. Whether
        it's exploring new trends or making essential purchases, users can rely on Lalasia E-commerce to deliver a
        seamless and enjoyable shopping journey.
      </Text>
    </section>
  );
};

export default About;
