
const Photo = props => {
    return (
        <div>
            <img
                src={props.photo.urls.small}
                alt={props.photo.alt_description}
                onClick={props.clicked}
                class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"
            />
           
        </div>
    )
}

export default Photo