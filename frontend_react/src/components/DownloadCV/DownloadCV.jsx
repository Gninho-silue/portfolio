import { HiDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './DownloadCV.scss';

const DownloadCV = () => {
  const handleDownload = () => {
   
    const cvUrl = '/Mon_cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Curriculum Vitae - Silue.pdf';
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