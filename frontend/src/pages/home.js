import './home.css';

export default function Home(){
    return(
        <div className='container-fluid' id = "home-page">
        <div className= "container home">
        {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dignissimos pariatur amet voluptatibus velit blanditiis ducimus, provident reprehenderit? Eius et quod modi necessitatibus ipsum accusantium. Quod exercitationem quasi repellat. Ipsam dolorem debitis minima error itaque laboriosam reprehenderit cupiditate rem culpa blanditiis! Amet iste voluptate quam corporis. Consectetur officiis earum obcaecati harum quae libero soluta vero perspiciatis atque sapiente ut corporis ipsa voluptatum voluptates adipisci possimus, autem molestias sit exercitationem. Deleniti sequi id voluptates recusandae? Labore placeat veritatis earum ea eveniet dignissimos architecto natus nisi ullam minus. Unde optio corporis, nihil et soluta minima eos. Velit ad, vitae reiciendis repudiandae alias officiis commodi, sapiente hic enim temporibus iusto ipsam! Fuga ab nam quibusdam nisi corporis ea est veniam. A, perspiciatis illo! Tempora odit laudantium numquam pariatur maxime, alias quas, eos et assumenda est sequi consequuntur voluptates quasi molestiae. Quo, nemo accusamus eligendi atque provident itaque fugiat officia et aperiam, quis totam facilis amet assumenda, iste magnam neque eveniet at. Voluptates non distinctio quibusdam nostrum ut consequatur? Illum, sapiente saepe culpa consectetur perferendis dignissimos blanditiis, earum voluptates atque nisi non tenetur qui assumenda nulla error fugit rerum autem, modi nesciunt voluptatem porro. Perspiciatis aut excepturi nobis quod recusandae amet quis! Vero, ducimus! */}
            <div className='box box-1'>
                <p className='box-name'>Total Complaints</p>
                <div className='box-value'>123213432</div>
            </div>
            <div className='box box-2'>
                <p className='box-name'>Pending Complaints</p>
                <div className='box-value'>123213432</div>
            </div>
            <div className='box box-3'>
                <p className='box-name'>Complaints Closed</p>
                <div className='box-value'>123213432</div>
            </div>
            <div className='box box-4'>
                <p className='box-name'>Replacements Issued</p>
                <div className='box-value'>123213432</div>
            </div>
        </div>
        </div>
    )
}