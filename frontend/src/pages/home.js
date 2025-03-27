import './home.css';
import { useData } from '../components/fetchdata';

export default function Home(){
    const { data } = useData();
    const totalCount = data?.length;
    const replacementIssuedCount = data?.filter(item => item.status === 4).length;
    const replacementDoneCount = data?.filter(item => item.status === 5).length;
    const closedCount = data?.filter(item => item.status === 3).length;
    const pendingCount = data?.filter(item => item.status === 1 ).length;
    const resolutionPendingCount = data?.filter(item => item.status === 2 ).length;

    return(
        <div className='container-fluid' id = "home-page">
        <div className= "container home">
        {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dignissimos pariatur amet voluptatibus velit blanditiis ducimus, provident reprehenderit? Eius et quod modi necessitatibus ipsum accusantium. Quod exercitationem quasi repellat. Ipsam dolorem debitis minima error itaque laboriosam reprehenderit cupiditate rem culpa blanditiis! Amet iste voluptate quam corporis. Consectetur officiis earum obcaecati harum quae libero soluta vero perspiciatis atque sapiente ut corporis ipsa voluptatum voluptates adipisci possimus, autem molestias sit exercitationem. Deleniti sequi id voluptates recusandae? Labore placeat veritatis earum ea eveniet dignissimos architecto natus nisi ullam minus. Unde optio corporis, nihil et soluta minima eos. Velit ad, vitae reiciendis repudiandae alias officiis commodi, sapiente hic enim temporibus iusto ipsam! Fuga ab nam quibusdam nisi corporis ea est veniam. A, perspiciatis illo! Tempora odit laudantium numquam pariatur maxime, alias quas, eos et assumenda est sequi consequuntur voluptates quasi molestiae. Quo, nemo accusamus eligendi atque provident itaque fugiat officia et aperiam, quis totam facilis amet assumenda, iste magnam neque eveniet at. Voluptates non distinctio quibusdam nostrum ut consequatur? Illum, sapiente saepe culpa consectetur perferendis dignissimos blanditiis, earum voluptates atque nisi non tenetur qui assumenda nulla error fugit rerum autem, modi nesciunt voluptatem porro. Perspiciatis aut excepturi nobis quod recusandae amet quis! Vero, ducimus! */}
            <div className='box box-1'>
                <p className='box-name'>Total</p>
                <div className='box-value'>{totalCount}</div>
            </div>
            <div className='box box-2'>
                <p className='box-name'>Pending</p>
                <div className='box-value'>{pendingCount + resolutionPendingCount}</div>
            </div>
            <div className='box box-3'>
                <p className='box-name'>Order Closed</p>
                <div className='box-value'>{closedCount}</div>
            </div>
            <div className='box box-4'>
                <p className='box-name'>Replacements Issued</p>
                <div className='box-value'>{replacementIssuedCount + replacementDoneCount}</div>
            </div>
        </div>
        </div>
    )
}