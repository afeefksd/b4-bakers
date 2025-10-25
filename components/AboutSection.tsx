import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>Your Trusted Partner in Bulk Dairy and Bakery Supplies</h2>
        
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={styles.intro}>
              Since <strong>2000</strong>, <strong>B4 BAKING</strong> has been the reliable choice for bulk suppliers 
              of dairy products and bakery ingredients across <strong>Kasaragod, Kerala</strong>. We serve as your 
              comprehensive wholesaler, offering a wide variety of premium ingredients and supplies.
            </p>

            <h3 className={styles.subtitle}>Explore Our Offerings</h3>
            
            <div className={styles.offerings}>
              <div className={styles.offering}>
                <div className={styles.icon}>🧈</div>
                <h4>Premium Ghee</h4>
                <p>A diverse selection of pure and high-quality ghee</p>
              </div>

              <div className={styles.offering}>
                <div className={styles.icon}>🍹</div>
                <h4>Fruit Crushes</h4>
                <p>Fresh and delicious fruit crushes in various flavors</p>
              </div>

              <div className={styles.offering}>
                <div className={styles.icon}>🍞</div>
                <h4>Baking Supplies</h4>
                <p>Essential baking supplies for all your needs</p>
              </div>

              <div className={styles.offering}>
                <div className={styles.icon}>🥛</div>
                <h4>Dairy Products</h4>
                <p>Complete range of dairy products for commercial use</p>
              </div>
            </div>

            <p className={styles.outro}>
              Enhance your creations with our high-quality products tailored for <strong>hotels</strong> and <strong>catering</strong>. 
              We proudly distribute esteemed brands, ensuring you have access to the finest options for all your culinary requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

