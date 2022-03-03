import styles from "./styles.module.scss";

import { Fragment } from "react";

const YourPrivateLifeLogo = ({ finished = false }) => (
  <svg className={`${styles.logo} ${finished ? styles.active : ""}`} width="562" height="70" viewBox="0 0 562 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M506.215 13.6914C506.215 9.53516 507.303 6.31901 509.48 4.04297C511.658 1.76693 514.725 0.628906 518.684 0.628906C520.193 0.628906 521.652 0.777344 523.062 1.07422C524.497 1.37109 526.229 1.92773 528.258 2.74414L525.66 8.31055C523.038 7.44466 520.885 7.01172 519.203 7.01172C517.323 7.01172 515.876 7.55599 514.861 8.64453C513.872 9.73307 513.377 11.2422 513.377 13.1719V18.9238H524.473V25.084H513.377V55.4766C513.377 58.099 513.179 60.4987 512.783 62.6758C512.412 64.8776 511.794 67.1908 510.928 69.6152H506.215V25.084H499.387V18.9238H506.215V13.6914Z" stroke="white"/>
    <path d="M16.1113 18.9238C17.1257 20.8535 18.14 22.8327 19.1543 24.8613C20.1686 26.89 20.8613 28.2878 21.2324 29.0547H21.6777C22.0241 28.2878 22.791 26.7415 23.9785 24.416C25.1908 22.0905 26.1432 20.2598 26.8359 18.9238L34.9629 4.19141H42.8672L25.0176 35.3633V58H17.7812V35.3633L0.00585938 4.19141H7.98438L16.1113 18.9238Z" stroke="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M65.0957 18.1816C70.959 18.1816 75.5111 19.9629 78.752 23.5254C81.9928 27.0632 83.6133 32.0234 83.6133 38.4062C83.6133 44.7891 81.9928 49.7493 78.752 53.2871C75.5111 56.8249 70.959 58.5938 65.0957 58.5938C59.2077 58.5938 54.6432 56.8249 51.4023 53.2871C48.1615 49.7493 46.541 44.7891 46.541 38.4062C46.541 32.0234 48.1615 27.0632 51.4023 23.5254C54.6432 19.9629 59.2077 18.1816 65.0957 18.1816ZM65.0957 24.4902C61.4342 24.4902 58.6387 25.6777 56.709 28.0527C54.804 30.4277 53.8516 33.8789 53.8516 38.4062C53.8516 42.9089 54.804 46.3477 56.709 48.7227C58.6387 51.0977 61.4342 52.2852 65.0957 52.2852C68.7324 52.2852 71.5156 51.0977 73.4453 48.7227C75.375 46.3477 76.3398 42.9089 76.3398 38.4062C76.3398 33.9036 75.375 30.4648 73.4453 28.0898C71.5156 25.6901 68.7324 24.4902 65.0957 24.4902Z" stroke="white"/>
    <path d="M101.24 50.3926C100.053 49.0814 99.459 47.0033 99.459 44.1582V18.9238H92.2969V44.7148C92.2969 49.2669 93.4225 52.7305 95.6738 55.1055C97.9499 57.4805 101.265 58.668 105.619 58.668C110.988 58.6927 115.391 56.6764 118.83 52.6191L119.758 58H125.51V18.9238H118.385V46.6074C117.074 48.3639 115.404 49.7617 113.375 50.8008C111.346 51.8398 109.219 52.3594 106.992 52.3594C104.345 52.3594 102.428 51.7038 101.24 50.3926Z" stroke="white"/>
    <path d="M144.584 24.416C145.945 22.3874 147.54 20.8535 149.371 19.8145C151.202 18.7754 153.206 18.2559 155.383 18.2559C156.842 18.2559 158.537 18.528 160.467 19.0723L159.168 26.0859C156.694 25.5911 155.024 25.3314 154.158 25.3066C151.981 25.3066 150.175 25.7148 148.74 26.5312C147.33 27.3477 146.118 28.6712 145.104 30.502V58H137.979V18.9238H143.693L144.584 24.416Z" stroke="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M215.613 7.58203C212.447 4.86068 207.87 3.5 201.883 3.5H186V49.0933L193.311 48.4164V35.1914H201.883C207.771 35.1914 212.323 33.8184 215.539 31.0723C218.755 28.3014 220.363 24.3802 220.363 19.3086C220.363 14.1875 218.78 10.2786 215.613 7.58203ZM212.756 19.3086C212.756 25.5924 209.132 28.7344 201.883 28.7344H193.311V9.95703H201.883C205.594 9.95703 208.327 10.7363 210.084 12.2949C211.865 13.8288 212.756 16.1667 212.756 19.3086Z" stroke="white"/>
    <path d="M235.875 44.4753L228.75 45.135V18.2324H234.465L235.355 23.7246C236.716 21.696 238.312 20.1621 240.143 19.123C241.973 18.084 243.977 17.5645 246.154 17.5645C247.614 17.5645 249.309 17.8366 251.238 18.3809L249.939 25.3945C247.465 24.8997 245.796 24.64 244.93 24.6152C242.753 24.6152 240.947 25.0234 239.512 25.8398C238.102 26.6562 236.889 27.9798 235.875 29.8105V44.4753Z" stroke="white"/>
    <path d="M264.82 41.7951L257.695 42.4549V18.2324H264.82V41.7951Z" stroke="white"/>
    <path d="M286.956 39.7455L279.626 40.4243L271.723 18.2324H279.256L286.715 39.0508C286.794 39.2744 286.875 39.5059 286.956 39.7455Z" stroke="white"/>
    <path d="M293.82 39.11L301.348 38.4129L308.535 18.2324H301.299L293.84 39.0508C293.833 39.0698 293.827 39.0895 293.82 39.11Z" stroke="white"/>
    <path d="M343.789 34.4832L316.424 37.017C316.515 36.9521 316.606 36.8878 316.699 36.8242C320.064 34.5234 324.789 33.373 330.875 33.373H336.627V32.2969C336.429 26.7305 333.572 23.9473 328.055 23.9473C326.372 23.9473 324.48 24.207 322.377 24.7266C320.274 25.2214 318.159 25.9017 316.031 26.7676L314.064 20.9785C316.34 19.9147 318.74 19.0983 321.264 18.5293C323.812 17.9355 326.249 17.6387 328.574 17.6387C333.448 17.6387 337.196 18.9251 339.818 21.498C342.465 24.0462 343.789 27.6953 343.789 32.4453V34.4832Z" stroke="white"/>
    <path d="M356.963 33.2634V24.3926H350.135V18.2324H357.334L358.855 7.0625H364.125V18.2324H376.037V24.3926H364.125V32.6003L356.963 33.2634Z" stroke="white"/>
    <path d="M407.899 28.5471C407.491 27.6349 406.964 26.8561 406.318 26.2109C404.809 24.6523 402.719 23.873 400.047 23.873C395.13 23.873 391.85 25.9771 390.207 30.1852L382.442 30.9042C383.202 27.6923 384.555 25.0146 386.502 22.8711C389.693 19.3333 394.208 17.5645 400.047 17.5645C405.514 17.5645 409.584 19.2096 412.256 22.5C413.453 23.9609 414.385 25.7559 415.05 27.8849L407.899 28.5471Z" stroke="white"/>
    <path d="M264.82 3.79688H257.695V11.1074H264.82V3.79688Z" stroke="white"/>
    <path d="M477.863 58H445.986V4.19141H453.297V51.543H477.863V58Z" stroke="white"/>
    <path d="M492.076 4.48828H484.951V11.7988H492.076V4.48828Z" stroke="white"/>
    <path d="M492.076 18.9238H484.951V58H492.076V18.9238Z" stroke="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M537.461 49.0566C535.482 46.9043 534.393 43.7995 534.195 39.7422H561.471V38.1465C561.471 31.4668 560.122 26.4818 557.426 23.1914C554.754 19.901 550.684 18.2559 545.217 18.2559C539.378 18.2559 534.863 20.0247 531.672 23.5625C528.48 27.0755 526.885 32.0234 526.885 38.4062C526.885 44.7891 528.505 49.7493 531.746 53.2871C534.987 56.8249 539.551 58.5938 545.439 58.5938C547.814 58.5938 550.177 58.2969 552.527 57.7031C554.878 57.0846 557.401 56.1198 560.098 54.8086L557.834 49.502C555.484 50.5163 553.381 51.2337 551.525 51.6543C549.695 52.0749 547.79 52.2852 545.811 52.2852C542.223 52.2852 539.44 51.209 537.461 49.0566ZM551.488 26.9023C553.022 28.4362 553.888 30.7246 554.086 33.7676H534.566C535.729 27.6322 539.279 24.5645 545.217 24.5645C547.889 24.5645 549.979 25.3438 551.488 26.9023Z" stroke="white"/>
    <path d="M198.461 53.2425L191.156 53.9728L191.186 58.1709L198.497 58.1174L198.461 53.2425Z" stroke="white"/>
    <path d="M233.876 49.702L240.996 48.9902L241.06 57.8062L233.935 57.8583L233.876 49.702Z" stroke="white"/>
    <path d="M262.801 46.8103L262.88 57.6466L270.005 57.5945L269.921 46.0985L262.801 46.8103Z" stroke="white"/>
    <path d="M286.099 44.481L290.822 57.4423L299.803 57.3766L304.945 42.597L297.553 43.336C297.276 44.2215 296.96 45.2356 296.605 46.3782L295.409 50.2464C294.573 47.5806 294.155 46.2972 294.156 46.3961C293.942 45.7917 293.648 44.9143 293.271 43.764L286.099 44.481Z" stroke="white"/>
    <path d="M317.769 41.3149C317.08 42.8177 316.742 44.5058 316.756 46.3793C316.782 49.917 317.953 52.7288 320.269 54.8148C322.585 56.9008 325.697 57.9295 329.606 57.9009C334.356 57.8662 338.623 56.066 342.407 52.5005L343.479 57.0572L348.971 57.0171L348.834 38.2093L341.677 38.9248L341.733 46.642C340.482 48.1355 338.87 49.3349 336.898 50.2399C334.925 51.1203 332.9 51.568 330.822 51.5832C328.645 51.5992 326.947 51.1415 325.727 50.2103C324.508 49.2543 323.892 47.8858 323.879 46.1046C323.862 43.7791 324.95 41.9651 327.142 40.6626C327.342 40.5416 327.549 40.426 327.764 40.3157L317.769 41.3149Z" stroke="white"/>
    <path d="M361.998 36.8932L362.064 45.8996C362.092 49.6599 363.09 52.5101 365.058 54.4502C367.052 56.3653 369.928 57.3092 373.689 57.2817C376.212 57.2632 378.941 56.6619 381.877 55.4776L380.5 49.884C378.575 50.5413 376.722 50.8765 374.941 50.8895C372.912 50.9043 371.449 50.4326 370.551 49.4743C369.679 48.5158 369.234 46.9233 369.218 44.6968L369.155 36.1777L361.998 36.8932Z" stroke="white"/>
    <path d="M386.753 37.1465C386.746 36.2033 386.774 35.2911 386.837 34.41L407.373 32.3569L413.866 31.7079L420.919 31.0027C421.182 32.7215 421.485 33.4647 421.5 35.5L394.073 38.429C394.3 42.4847 395.412 45.5815 397.406 47.7193C399.401 49.8571 402.192 50.9129 405.779 50.8867C407.759 50.8722 409.662 50.648 411.49 50.214C413.342 49.7799 415.439 49.0471 417.782 48.0156L420.085 53.3056C417.398 54.6365 414.881 55.6197 412.536 56.2554C410.19 56.8663 407.829 57.1804 405.455 57.1978C399.567 57.2409 394.989 55.5054 391.723 51.9914C388.456 48.4775 386.799 43.5292 386.753 37.1465Z" stroke="white"/>
  </svg>
);

export default function LoaderStartLogo ({ finished = false }) {
  return (
    <Fragment>
      <YourPrivateLifeLogo
        finished={finished}
      />
    </Fragment>
  );
}