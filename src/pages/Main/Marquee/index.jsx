import React from "react";
import styles from "./Marquee.module.css";
function Marquee(props) {
  return (
    <div className={styles.text_rolling}>
      <div className={styles.text_rolling_content_border}>
        <marquee
          className={styles.text_rolling_content}
          id="marquee_1"
          onMouseOver="this.stop()"
          onMouseOut="this.start()"
          behavior=""
          direction="down"
        >
          <div>Bienvenue dans Tour des Gâteau</div>
          <div>ケーキの塔へようこそ</div>
          <div>케이크 타워에 오신 것을 환영합니다</div>
          <div>欢迎来到蛋糕塔</div>
          <div>добро пожаловать в Башню тортов</div>
          <div id="vn">Chào mừng đến với Tháp Bánh Kem</div>
          <div>Welcome to Tour des Gâteau</div>
        </marquee>
      </div>
    </div>
  );
}

export default Marquee;
