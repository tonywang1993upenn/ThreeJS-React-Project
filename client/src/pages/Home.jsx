
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';
import state from '../store';

import CustomButton from '../components/CustomButton'
const Home = () => {

    const snap = useSnapshot(state)
    return (

        <AnimatePresence>

            {/* if we are at the intro page then(&&)  slide the tag to left*/}
            {snap.intro && (
                <motion.section className='home'{...slideAnimation('left')}>

                    <motion.header {...slideAnimation('down')}>
                        <img
                            src='./threejs.png'
                            alt='logo'
                            className='w-8 h-8 object-contians'>


                        </img>
                    </motion.header>

                    <motion.header className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                Design <br className='xl: block hidden' /> Your Shirt.
                            </h1>
                        </motion.div>

                        <motion.div {...headContainerAnimation}>
                            <p className='max-w-md font-normal'>Create your unique shirt </p>
                            <CustomButton
                                type='filled'
                                title='Customize it'
                                handleClick={() => state.intro = false}
                                customStyle='w-fit px-4 py-2.5 font-bol text-sm'
                            />
                        </motion.div>
                    </motion.header>

                </motion.section>)}
        </AnimatePresence>

    )
}

export default Home
