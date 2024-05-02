import './loader.scss';
import GradientCircularProgress from '../GradientCircularProgress/GradientCircularProgress';

interface ILoader {
  height?: 'auto' | '100vh';
}

const Loader = ({ height = 'auto' }: ILoader) => {
  return (
    <div className="loader" style={{ height: height }}>
      <GradientCircularProgress />
    </div>
  );
};

export default Loader;
