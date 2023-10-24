import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandBook.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carouse from '../Carouse'



class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        }

        return (
            <>
                <div className='Section-HandBook'>
                    <Carouse />

                    <div className='HandBook-container'>
                        <div className='HandBook-title'>
                            <span className='HandBook-title-one'>CẨM NANG</span>
                            <div className='HandBook-title-two'>XEM THÊM</div>
                        </div>
                        <div className='HandBook-body'>

                            <Slider {...settings}>
                                <div className='HandBook-custom'>
                                    <div className='bg-image1' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Review kem chống nắng Anessa</div>
                                        <div className='text-child'>Kem chống nắng là vị cứu tinh không thể thiếu của chị em mỗi khi ra ngoài. Nếu bạn đang phân vân để chọn sản phẩm nào bảo vệ tối ưu cho làn da của mình thì hãy tham khảo qua kem chống nắng nhà Anessa nhé.</div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>


                                </div>
                                <div className='HandBook-custom'>
                                    <div className='bg-image2' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Cách dùng retinol đúng cách</div>
                                        <div className='text-child'>Retinol tác động ở lớp hạ bì giúp tăng sinh collagen, cải thiện độ đàn hồi da và kích thích tăng tốc chu trình tái tạo tế bào da mới. Việc tăng tốc chu trình sản sinh tế bào mới sẽ làm dày lớp biểu bì da. Đây cũng chính là mấu chốt để có được làn da luôn tươi mới, khỏe mạnh cùng nền da vững chắc. Thêm vào đó, Retinol còn kích thích sản sinh ra GAGS - chất giữ nước của lớp trung bì giúp da có độ trong, căng bóng.
                                        </div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>

                                </div>
                                <div className='HandBook-custom'>
                                    <div className='bg-image3' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Laneige dành cho da Dầu</div>
                                        <div className='text-child'>Kem Dưỡng Ẩm Laneige Water Bank Blue HA Cream 50ml là dòng kem dưỡng da đến từ thương hiệu mỹ phẩm Laneige của Hàn Quốc, với thành phần Blue Hyaluronic Acid giúp chữa lành các vấn đề mà da đang gặp phải cho từng loại da. Kem dưỡng như một bước khóa ẩm cho các tinh chất thẩm thấu vào da, nhẹ nhàng bổ sung độ ẩm mà không gây bết dính cho da, các hạt kem sẽ tan chảy khi chạm vào da và phủ lên bề mặt một hàng rào giữ ẩm để giữ cho da ngậm nước trong nhiều giờ.</div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>


                                </div>
                                <div className='HandBook-custom'>
                                    <div className='bg-image4' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Ngăn ngừa lão hóa da mặt</div>
                                        <div className='text-child'>Lão hóa là quá trình tự nhiên hay còn gọi là lão hóa nội tại. Hầu hết mọi người đều trải qua giai đoạn này với những nếp nhăn trên mặt cùng với làn da trở nên mỏng hơn, khô hơn. Tuy nhiên, có một số yếu tố như: môi trường, thói quen, chế độ ăn... làm cho quá trình lão hoá diễn ra sớm hơn. Bài viết sẽ cung cấp thêm thông tin giúp giảm quá trình lão hóa sớm của làn da</div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>


                                </div>
                                <div className='HandBook-custom'>
                                    <div className='bg-image5' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Ăn gì tránh nổi mụn nóng trong</div>
                                        <div className='text-child'>Có thể dễ dàng tìm thấy các thực phẩm chứa nhiều acid béo omega – 3 như cá ngừ, cá hồi, cá thu, cá trích, các loại đậu, các loại hạt như óc chó, hướng dương, hạt lanh... Ngoài tác dụng giảm mụn thì những thực phẩm này rất tốt cho cơ thể do khả năng chống oxy hóa và tốt cho tế bào thần kinh.</div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>


                                </div>
                                <div className='HandBook-custom'>
                                    <div className='bg-image6' />
                                    <div className='HandBook-custom-down'>
                                        <div className='text-one'>Lợi ich của việc uống đủ nước</div>
                                        <div className='text-child'>Nước giúp cung cấp độ ẩm cho da, giúp da có độ căng bóng, mịn màng hơn. Đặc biệt là những ngày thời tiết hay khô, khiến da nứt nẻ, việc uống đủ nước sẽ giúp da cải thiện được tình trạng này. Ngoài ra, uống nước cũng là cách để giảm tình trạng da mụn, đặc biệt là những người da dầu.</div>
                                        <div className='see-more'>Xem thêm<i class="fa fa-chevron-right"></i></div>
                                    </div>
                                </div>

                            </Slider>
                        </div>
                    </div >
                </div >
            </>
        );
    }

}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
