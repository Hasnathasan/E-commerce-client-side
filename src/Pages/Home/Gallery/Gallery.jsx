import Watch1 from '../../../../public/Watch1.jpg'
import Watch2 from '../../../../public/Watch2.jpg'
import Watch3 from '../../../../public/Watch3.jpg'
import Watch4 from '../../../../public/Watch4.jpg'
import Watch5 from '../../../../public/Watch5.jpg'
import Watch6 from '../../../../public/Watch6.jpg'
import Watch7 from '../../../../public/Watch7.jpg'
import Watch8 from '../../../../public/Watch8.jpg'
import Watch9 from '../../../../public/Watch9.jpg'
import Watch10 from '../../../../public/Watch10.jpg'
import Watch11 from '../../../../public/Watch11.jpg'
import Watch12 from '../../../../public/Watch12.jpg'
import { Card } from '@material-tailwind/react'

const Gallery = () => {
    const gallery = [[Watch1, Watch2, Watch3], [Watch4, Watch5, Watch6], [Watch7, Watch8, Watch9], [Watch10, Watch11, Watch12]]
    return (
        <Card className='max-w-[1240px] mx-auto bg-cyan-50  p-16 my-20'>
            <h1 className='text-3xl font-bold mb-10'>Explore all new <span className='text-cyan-500 text-4xl'>SMART WATCH</span></h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
           
            {gallery.map((col, index) => (
          <div key={index} className="grid gap-4">
            {col.map((img, index) => (
              <div className="" key={index}>
                <img
                  className="h-full max-w-full hover:scale-105 transition-all rounded-lg"
                  src={img}
                  alt=""
                />
              </div>
            ))}
          </div>
        ))}
        </div></Card>
    );
};

export default Gallery;