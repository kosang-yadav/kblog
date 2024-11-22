import { useState } from "react";
import styled,{keyframes} from "styled-components";
import { Yinyang } from "./Svgs";
import { useNavigate } from "react-router-dom";

const clickAnimation = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(360deg);
  }
  100% {
    transform: scale(1.5) rotate(720deg);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  // width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
`;


const RotatingYinYang = styled.div`
  position : relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${(props) => (props.animate ? clickAnimation : "none")} 1s ease-in-out;
`;

const HalfOverlay = styled.div`
  position: absolute;
  width: 50%; /* Half the width of the parent SVG container */
  height: 100%; /* Full height of the parent SVG container */
  top: 0;
  left: ${(props) => (props.side === "left" ? 0 : "50%")}; /* Align left or right */
  background-color: transparent;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Optional hover effect */
  }

  &::after {
    content: "${(props) => (props.side === "left" ? "Login" : "Signup")}";
    position: absolute;
    top: 50%; /* Center the text vertically */
    ${(props) => (props.side === "left" ? "left: -60px;" : "right: -60px;")};
    transform: translateY(-50%);
    font-size: 1rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1; /* Show the text on hover */
  }
`;



// const Center = styled.button`
// position: absolute;
// top: ${props => props.click ? '85%' :'50%'  };
// left: ${props => props.click ? '82%' :'50%'  };
// transform: translate(-50%,-50%);
// border: none;
// outline: none;
// background-color: transparent;
// cursor: pointer;

// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// transition: all 1s ease;

// &>:first-child{
//     animation: ${rotate} infinite 1.5s linear;
// }

// &>:last-child{
//     display: ${props => props.click ? 'none' :'none'  };
//     padding-top: 1rem;
// }
// `


const YinYang = () => {
    const [animate, setAnimate] = useState(false); // Animation trigger
    const navigate = useNavigate();

    const handleClick = (side) => {
        setAnimate(true); // Start animation

        // Redirect after animation completes
        setTimeout(() => {
        if (side === "left") {
            navigate("/login");
        } else {
            navigate("/signup");
        }
        setAnimate(false);
    }, 1000); // 1s animation time
};


    return (<>
        {/* <div className="font-bold">
            <h1>BloG</h1>
            <h3>Please SignUp or LogIn using this <strong className="text-2xl">YinYang</strong></h3>
        </div> */}
        <Container >
            <RotatingYinYang animate={animate}>
                <Yinyang fill="currentColor" width={200} height={200} />
                <HalfOverlay side="left" onClick={() => handleClick("left")} />
                <HalfOverlay side="right" onClick={() => handleClick("right")} />
            </RotatingYinYang>
            {/* <h2>Click Me</h2> */}
        </Container>
    </>

        // <Center  click={click}>
        //     <Yinyang  onClick={()=> handleClick()} width={click ? 120 : 200} height={click ? 120 : 200} fill='currentColor' />
        //     <span >click here</span>
        // </Center>
    );
}

export default YinYang