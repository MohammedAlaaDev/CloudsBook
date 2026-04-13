window.addEventListener("DOMContentLoaded", () => {

    // register plugins
    gsap.registerPlugin(ScrollTrigger);

    gsap.defaults({
        ease: "none",
    })

    // hero selectors
    const hero = document.querySelector(".hero");
    const movingClouds = gsap.utils.toArray(".hero .moving-cloud");
    const heroWidth = hero.clientWidth;

    // chapters section selectors
    const chapters = gsap.utils.toArray(".chapter");
    const chaptersLen = chapters.length;

    // gallery section selectors
    const clipContainer = gsap.utils.toArray(".clip-container");
    const galleryFrames = gsap.utils.toArray(".gallery-frame");


    // frames (pinning) section selectors
    const framesSection = document.querySelector("#frames-section");
    const frames = gsap.utils.toArray("#frames-section .frame");
    const frame1 = document.querySelector("#frames-section .frame-1");
    const frame2 = document.querySelector("#frames-section .frame-2");

    // responsive
    const pageMM = gsap.matchMedia();

    pageMM.add({
        isMoblie: "(max-width:599px)",
        isDesktop: "(min-width:600px)",
    }, (context) => {
        const { isMoblie, isDesktop } = context.conditions;

        // ==== start hero animation ====
        const heroAnimation = () => {

            // setters
            gsap.set(hero, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            })
            gsap.set(".hero-heading span", {
                display: "inline-block",
            })
            gsap.set(".hero-p", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            })

            // first render animation
            const heroTl = gsap.timeline();

            heroTl.from(".hero-heading span", {
                opacity: 0,
                y: 40,
                x: 20,
                rotate: 30,
                duration: 3.5,
                ease: "elastic.out",
                stagger: 0.2,
            }).from(".hero-p", {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                opacity: isMoblie ? 0 : 1,
                duration: isMoblie ? 2.5 : 1.5,
            }, "0").from(hero, {
                clipPath: isMoblie ? "polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)" : "polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)",
                delay: 1,
                ease: "power1.out",
                duration: 1.5,
            }, "0").from(".branch", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power1.out",
            }, "<50%").from(".bottom-cloud", {
                opacity: 0,
                duration: 1,
                ease: "power1.out",
            }, "<0%")

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
                    end: "bottom 30%",
                    trigger: hero,
                    scrub: 1,
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

        }
        heroAnimation();
        // ==== End hero animation ====


        // ==== Start Chapters animation ====
        const chaptersAnimation = () => {
            const horizontalScroll = gsap.to(".chapters-container", {
                xPercent: -100 * (chaptersLen - 1),
                scrollTrigger: {
                    // markers: true,
                    trigger: ".chapters",
                    start: "top top",
                    end: `+=${500 * chaptersLen}px bottom`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            })

            chapters.forEach((chapter, idx) => {
                const chapterTl = gsap.timeline({
                    scrollTrigger: {
                        containerAnimation: horizontalScroll,
                        // markers: true,
                        start: "left center",
                        end: "bottom bottom",
                        trigger: chapter,
                        toggleActions: "play none none reverse"
                    }
                });

                chapterTl.from(chapter.querySelector(".chapter-title"), {
                    opacity: 0,
                    y: 30,
                }).from(chapter.querySelector(".chapter-subtitle"), {
                    opacity: 0,
                    y: 30,
                }, "<10%")
                if (idx !== 0) {

                    chapterTl.from(chapter.querySelector(".chapter-paragraph"), {
                        y: 30,
                        opacity: 0,
                    }, "<10%").from(chapter.querySelector("img"), {
                        y: 30,
                        opacity: 0,
                    }, "<10%")
                }

            })
        }
        chaptersAnimation();
        // ==== End Chapters animation ====


        // ==== Start Gallery animation ====
        const galleryAnimation = () => {
            // gallery section setters
            galleryFrames.forEach((galleryFrame) => {
                gsap.set(galleryFrame, {
                    clipPath: "polygon(35% 23%, 69% 45%, 100% 100%, 0 100%)",
                })
            })

            clipContainer.forEach((clip, idx) => {
                const isLast = idx === clipContainer.length - 1;

                // inner text
                const lettersAnimation = () => {
                    gsap.set(clip.querySelectorAll(".frame-letters span"), {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    })
                    gsap.from(clip.querySelectorAll(".frame-letters span"), {
                        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        opacity: 0,
                        stagger: {
                            each: isLast ? 0.01 : 0.1,
                            from: "center",
                        },
                        scrollTrigger: {
                            trigger: clip,
                            // markers: true,
                            start: "top center",
                            end: "top center",
                            toggleActions: "play none none reverse"
                        }
                    })
                }
                lettersAnimation();

                // clip path effect
                const clipPathAnimation = () => {
                    const clipTl = gsap.timeline({
                        scrollTrigger: {
                            // markers: true,
                            start: "top bottom",
                            end: `bottom ${isLast ? "bottom" : "top"}`,
                            scrub: 1,
                            trigger: clip
                        }
                    });

                    clipTl.to(clip.querySelector(".gallery-frame"), {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    })

                    if (!isLast) {
                        clipTl.to(clip.querySelector(".gallery-frame"), {
                            clipPath: "polygon(0 0, 100% 0, 77% 56%, 35% 68%)",
                        })
                    }
                }
                clipPathAnimation();
            })
        }
        galleryAnimation();
        // ==== End Gallery animation ====


        // ==== Start Frames animation (pinning) ====
        const framesAnimation = () => {
            // frames (pinning) section setters
            frames.forEach((frame, idx) => {
                gsap.set(frame, {
                    zIndex: -idx,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                })
            })

            const framesTl = gsap.timeline({
                scrollTrigger: {
                    trigger: framesSection,
                    start: "top top",
                    end: `+=${frames.length * 500}px bottom`,
                    pin: true,
                    anticipatePin: 1,
                    scrub: 1,
                    // markers: true,
                },
                defaults: {
                    ease: "power1.out",
                }
            });

            if (isMoblie) {
                framesTl.to(frame1, {
                    clipPath: "polygon(0% 0%, 40% 0, 40% 100%, 0% 100%)",

                }).to(frame2, {
                    clipPath: "polygon(0% 0%, 60% 0%, 60% 100%, 0% 100%)",
                })
            } else {
                framesTl.to(frame1, {
                    clipPath: "polygon(0% 0%, 45% 0, 45% 100%, 0% 100%)",

                }).to(frame2, {
                    clipPath: "polygon(0% 0%, 55% 0%, 55% 100%, 0% 100%)",
                })
            }

        }
        framesAnimation();
        // ==== End Frames animation (pinning) ====

        // start footer animation
        const footerAnimation = () => {

            gsap.set("footer span", {
                display: "inline-block",
            })
            const footerTl = gsap.timeline({
                defaults: {
                    ease: "power1.inOut",
                    duration: 1,
                    stagger: 0.1,
                },
                repeat: -1,
                yoyo: true
            });

            footerTl.to("footer span", {
                y: 15,
            })
        }

        footerAnimation();
        // end footer animation

    })


})