const Carousel = ({ data }) => {
  return (
    <section className="my-10 px-6">
      <div className="scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-72 shrink-0 snap-center overflow-hidden rounded-2xl bg-gray-900 shadow-xl transition-transform hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <h3 className="p-4 text-lg font-semibold text-white">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
