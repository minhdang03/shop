import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import SlidesSkeleton from '../shared/skeletons/SlidesSkeleton';

const MenSlide = () => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true
    });

    return (
        <div ref={ref}>
            {!inView ? (
                <SlidesSkeleton />
            ) : (
                <motion.div 
                    className="relative w-full aspect-[21/9] md:aspect-[21/7] overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.img 
                        src="/images/main/nam.jpg" 
                        alt="Banner nước hoa nam" 
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                        <motion.h2 
                            className="text-2xl md:text-4xl font-bold mb-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Nước Hoa Nam
                        </motion.h2>
                        <motion.p 
                            className="text-sm md:text-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Khẳng định phong cách của người đàn ông hiện đại
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default MenSlide;