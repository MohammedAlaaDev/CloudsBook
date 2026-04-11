window.addEventListener("DOMContentLoaded", () => {

    // register plugins
    gsap.registerPlugin(ScrollTrigger);

    // == start hero animation ==


    // hero selectors
    const hero = document.querySelector(".hero");
    const movingClouds = gsap.utils.toArray(".hero .moving-cloud");
    const heroWidth = hero.clientWidth;

    // setters
    gsap.set(hero, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    })
    gsap.set(".hero-heading span", {
        display: "inline-block",
    })
    gsap.set(".hero-p", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    })

    // first render animation
    const heroTl = gsap.timeline();

    // responsive
    const heroMM = gsap.matchMedia();

    heroMM.add({
        isMoblie: "(max-width:599px)",
        isDesktop: "(min-width:600px)",
    }, (context) => {
        const { isMoblie, isDesktop } = context.conditions;
        heroTl.from(".hero-heading span", {
            opacity: 0,
            y: 40,
            x: 20,
            rotate: 30,
            duration: 3.5,
            ease: "elastic.out",
            stagger: 0.2,
            delay: isMoblie ? 2 : 0,
        }).from(".hero-p", {
            clipPath: isMoblie ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            opacity: isMoblie ? 0 : 1,
            duration: isMoblie ? 2.5 : 1.5,
        }, "0").from(hero, {
            clipPath: "polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)",
            delay: 1,
            ease: "power1.out",
            duration: 1.5,
        }, "0").from(".branch", {
            y: 40,
            opacity: 0,
            duration:1,
        },"<50%").from(".bottom-cloud", {
            opacity: 0,
            duration:1,
        },"<0%")

        // moving clouds animation
        movingClouds.forEach(cloud => {
            // setter at random place
            gsap.set(cloud, {
                x: `random(0,${heroWidth})`
            });
        });

        movingClouds.forEach(cloud => {
            // move the clouds infinitely
            gsap.to(cloud, {
                x: `random(0,${heroWidth})`,
                yoyo: true,
                repeat: -1,
                duration: 70,
            });
        });


        // hero scroll trigger
        const heroScrollTl = gsap.timeline({
            scrollTrigger: {
                // markers: true,
                start: "top top",
                end: "bottom top",
                trigger: hero,
                scrub: 1,
                ease: "none",
            }
        });

        heroScrollTl.to(".hero .branch", {
            y: 100,
        }).to(".right-branch", {
            scale: isMoblie ? 2 : 1,
        }, "<0%").to(".left-branch", {
            scaleY: isMoblie ? -2 : -1,
            scaleX: isMoblie ? 2 : 1,
        }, "<0%").to(".bottom-cloud", {
            scaleY: isMoblie ? -3 : -1.5,
            scaleX: isMoblie ? 3 : 1.5,
        })

    })







    // == End hero animation ==

})