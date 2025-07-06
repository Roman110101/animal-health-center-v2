import styles from "./HeroSection.module.css";
import Image from "next/image";
import heroImage from "/public/iphone-hero.png"; // замени на своё

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>iPhone</h1>
        <p className={styles.subtitle}>Meet the iPhone 16 family.</p>
        <div className={styles.buttons}>
          <button className={styles.primary}>Learn more</button>
          <button className={styles.secondary}>Shop iPhone</button>
        </div>
        <p className={styles.tagline}>
          Built for <span className={styles.gradient}>Apple Intelligence.</span>
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Image src={heroImage} alt="iPhone" className={styles.image} priority />
      </div>
    </section>
  );
};

export default HeroSection;
