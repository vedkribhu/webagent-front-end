import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from 'styled-components';
import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Parent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    .swiper {
        width: 100%;
        height: 100%;
    }
    
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;


export default function SwiperComponent({ results }: { results: Array<string> }) {
    return (
        <Parent>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Virtual]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {results.map((result, index) => (
                    <SwiperSlide key={index}>

                        <StyledImage src={`data:image/png;base64,${result}`} />
                    </SwiperSlide>
                ))}
                ...
            </Swiper>
        </Parent>
    );
};
