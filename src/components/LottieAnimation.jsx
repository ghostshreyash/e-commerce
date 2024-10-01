import Lottie from 'react-lottie';


const LottieAnimation = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,  
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
