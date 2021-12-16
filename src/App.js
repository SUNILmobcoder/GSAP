import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { gsap } from 'gsap';

// import logo from './logo.svg';
import './App.css';

const App = () => {
  // part 1
  const boxRef = useRef();
  useEffect(() => {
    gsap.to(boxRef.current, { rotation: '+=360' });
  });

  // part 2
  const el = useRef();
  const q = gsap.utils.selector(el);
  useEffect(() => {
    gsap.to(q('.box'), {
      x: 100,
      stagger: 0.33,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    });
  });

  // part 3
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    const boxes = [ref1.current, ref2.current];
    gsap.to(boxes, {
      x: 100,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    });
  }, []);

  // part 4
  const mouseEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      background: '#bfb',
      scale: 1.4,
      rotation: '+=360',
    });
  };
  const mouseLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      backgroundColor: '#d3d',
      scale: 1,
    });
  };

  // part 5
  const innerWidth = 100;
  const innerHeight = 100;
  const circleRef = useRef([]);
  //reset on re-render
  circleRef.current = [];
  useEffect(() => {
    circleRef.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );
    const onMove = ({ clientX, clientY }) => {
      circleRef.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const addCircleRef = (ref) => {
    if (ref) circleRef.current.push(ref);
  };
  return (
    <div className="app">
      {/* part 1  */}
      <div className="box" ref={boxRef}>
        Hello
      </div>
      <hr />

      {/* part 2  */}
      <div className="app" ref={el}>
        <Box>box</Box>
        <Container />
        <Box>box</Box>
      </div>
      <hr />

      {/* part 3  */}
      <Box ref={ref1}>box1</Box>
      <Container />
      <Box ref={ref2}>box2</Box>
      <hr />

      {/* part 4  */}
      <div className="box" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        Hover me
      </div>
      <hr />

      {/* partr 5  */}
      <div className="wrap">
        <p>Move your mouse</p>
        <Circle size="sm" ref={addCircleRef} delay={0} />
        <Circle size="md" ref={addCircleRef} delay={0.1} />
        <Circle size="lg" ref={addCircleRef} delay={0.2} />
      </div>
    </div>
  );
};

export default App;

// part 2
const Box = forwardRef(({ children }, ref) => {
  return (
    <div className="box" ref={ref ? ref : null}>
      {children}
    </div>
  );
});
const Container = () => {
  return (
    <div>
      <Box>Nested Box</Box>
    </div>
  );
};

// part 5
const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();
  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );
  return <div className={`circle ${size}`} ref={el}></div>;
});
