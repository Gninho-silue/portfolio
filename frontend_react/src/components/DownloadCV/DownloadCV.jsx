import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './DownloadCV.scss';
import images from '../../constants/images';

const DownloadCV = () => {
  const handleDownload = () => {
   
    const cvUrl =  images.Mon_cv;;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Silue_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      className="download-cv-btn"
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <HiDownload />
      <span>Download CV</span>
    </motion.button>
  );
};

export default DownloadCV;