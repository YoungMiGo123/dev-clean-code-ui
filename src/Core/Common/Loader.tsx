
import { ThreeCircles } from  'react-loader-spinner';

const LoaderSpinner = ({width = 100, height = 100, color="#4fa94d"}) => {
    return (
        <ThreeCircles
            color={color}
            width={width}
            height={height}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />
    );
}

export {LoaderSpinner}