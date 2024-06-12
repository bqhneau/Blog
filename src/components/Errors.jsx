const Errors = ({errors}) => {
    if (!errors) {
        return null;
    }

    return (
        <p className="error-messages text-xs-center" >
            {errors}
        </p>
    )
}

export default Errors