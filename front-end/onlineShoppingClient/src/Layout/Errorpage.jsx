const Errorpage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <h2 className="text-4xl font-bold text-red-600 mb-2">Error</h2>
            <h2 className="text-2xl text-gray-700 mb-4">404 - Page Not Found</h2>
            <a href="/" className="text-blue-500 underline hover:text-blue-700 transition">
                Go back to Home
            </a>
        </div>
    );
};

export default Errorpage;
