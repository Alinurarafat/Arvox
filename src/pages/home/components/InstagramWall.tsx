import { socialImages } from '@/mocks/socialImages';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function InstagramWall() {
  const sectionRef = useScrollReveal<HTMLElement>({ staggerDelay: 50 });

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="text-center py-16 md:py-20 px-4 md:px-8 lg:px-12 sr-reveal" data-sr-delay="0">
        <h2 className="font-grotesque text-2xl md:text-3xl font-bold text-arvox-black uppercase tracking-wider mb-3">
          Follow Us on Instagram
        </h2>
        <p className="font-body text-sm text-gray-500 max-w-md mx-auto">
          Follow us on Instagram{' '}
          <span className="text-arvox-black font-semibold">@ArvoxSpace</span>{' '}
          and tag us to get featured on our timeline.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5">
        {socialImages.map((image, index) => (
          <a
            key={index}
            href="https://instagram.com/ArvoxSpace"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer sr-reveal"
            data-sr-stagger="true"
            data-sr-delay="100"
          >
            <img
              src={image}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-instagram-line text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}