import 'bootstrap';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    timeout,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,
    AssetImporter,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./sass/_index.scss";

// GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Loader
    const importer = manager.importer as AssetImporter

    importer.addEventListener('onProgress', (evt) => {
        const progressRatio = (evt.loaded / evt.total)
        console.log(progressRatio)
        // document.querySelector('.progress-bar1')?.setAttribute('style', `transform: scaleX(${ progressRatio })`)
        // document.querySelector('.progress-bar2')?.setAttribute('style', `transform: scaleX(${ progressRatio })`)
        gsap.to('.progress-bar1', { duration: 1, scaleX: progressRatio, transformOrigin: '0% 50%' })
        gsap.to('.progress-bar2', { duration: 1, scaleX: progressRatio, transformOrigin: '0% 50%' })
    })

    importer.addEventListener('onLoad', (evt) => {
        gsap.to('.loader', { delay: 1, duration: 1, autoAlpha: 0 })
        gsap.to(window, { duration: 0.05, scrollTo: { y: 0, autoKill: false } });
        
    })

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/ghost2.glb")

    // Load an environment map if not set in the glb file
    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    // Add some UI for tweak and testing.
    const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

    // camera.setCameraOptions({ fov: 50 })

    function initScrollAnimation() {
        const section1 = document.querySelector('#section1') as HTMLElement
        const section2 = document.querySelector('#section2') as HTMLElement
        const section3 = document.querySelector('#section3') as HTMLElement
        const section4 = document.querySelector('#section4') as HTMLElement
        const section5 = document.querySelector('#section5') as HTMLElement

        const smoothie = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 2,
            smoothTouch: true,
        })

        const ghostTL = gsap.timeline({ onComplte: () => { console.log('on complete scene1') }})
        const ghostTL2 = gsap.timeline()
        const ghostTL3 = gsap.timeline()
        const ghostTL4 = gsap.timeline()
        const ghostTL5 = gsap.timeline()
        const anim1TL = gsap.timeline()
        const anim2TL = gsap.timeline()
        const anim3TL = gsap.timeline()
        const anim4TL = gsap.timeline()
        const anim5TL = gsap.timeline()
         const ghostAnimDur = 2

        const ufoTL = gsap.timeline({ repeat: -1, yoyo: true })
        ufoTL
        .add('ufoAnim')
        .to('.ufo', { duration: 1, y: -20, ease: 'sine.inOut' }, 'ufoAnim')
        .to('.ufo', { duration: 1, rotation: -10, ease: 'sine.inOut' }, 'ufoAnim+=0.3')
        .add('ufoAnim2')
        .to('.ufo', { duration: 1, y: 0, ease: 'sine.inOut' }, 'ufoAnim2+=0.1')
        .to('.ufo', { duration: 1, rotation: 10, ease: 'sine.inOut' },'ufoAnim2')
        
        // SCENE 1 CAMERA
        ghostTL
        .add('camera1')
        .to(position, { duration: ghostAnimDur, x: 2.9362635967, y: -1.6968395839, z: 2.8401969836, onUpdate: webgiUpdate }, 'camera1')
        .to(target, { duration: ghostAnimDur, x: -0.2560148524, y: -0.0741596506, z: 1.0919463476 }, 'camera1')
        const ghostST = ScrollTrigger.create({
            animation: ghostTL,
            trigger: '#section2',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false,
        })
        // SCENE 1 ANIMATION
        anim1TL
        .add('anim1')
        .to('.section1-copy', { duration: 1, yPercent: -100, opacity: 0 }, 'anim1')
        .from('.section2-copy', { duration: 1, yPercent: 100, opacity: 0 }, 'anim1')
        ScrollTrigger.create({
            animation: anim1TL,
            trigger: '#section2',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 2 CAMERA
        ghostTL2
        .add('camera2')
        .to(position, { duration: ghostAnimDur, x: -5.131316672, y: 0.1176477196, z: 10.7760203025, onUpdate: webgiUpdate }, 'camera2')
        .to(target, { duration: ghostAnimDur, x: 2.6888452326, y: -1.0306176781, z: 1.8387450979 }, 'camera2')
        const ghostST2 = ScrollTrigger.create({
            animation: ghostTL2,
            trigger: '#section3',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 2 ANIMATION
        anim2TL
        .add('anim2')
        .to('.section2-copy', { duration: 1, yPercent: -100, opacity: 0 }, 'anim2')
        .from('.section3-copy', { duration: 1, yPercent: 100, opacity: 0 }, 'anim2')
        ScrollTrigger.create({
            animation: anim2TL,
            trigger: '#section3',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })

        // SCENE 3 CAMERA
        ghostTL3
        .add('camera3')
        .to(position, { duration: ghostAnimDur, x: -0.3948204204, y: -4.3682218572, z: 4.323688804, onUpdate: webgiUpdate }, 'camera3')
        .to(target, { duration: ghostAnimDur, x: 1.34638915, y: 1.3368042845, z: 1.0247688353 }, 'camera3')
        const ghostST3 = ScrollTrigger.create({
            animation: ghostTL3,
            trigger: '#section4',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 3 ANIMATION
        anim3TL
        .add('anim3')
        .to('.section3-copy', { duration: 1, yPercent: -100, opacity: 0 }, 'anim3')
        .from('.section4-copy', { duration: 1, yPercent: 100, opacity: 0 }, 'anim3')
        ScrollTrigger.create({
            animation: anim3TL,
            trigger: '#section4',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 4 CAMERA
        ghostTL4
        .add('camera4')
        .to(position, { duration: ghostAnimDur, x: -0.5922336001, y: 0.4404157014, z: 6.6953893315, onUpdate: webgiUpdate }, 'camera4')
        .to(target, { duration: ghostAnimDur, x: 0.0720317825, y: -0.0315525397, z: -0.3388108623 }, 'camera4')

        const ghostST4 = ScrollTrigger.create({
            animation: ghostTL4,
            trigger: '#section5',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 4 ANIMATION
        anim4TL
        .add('anim4')
        .to('.section4-copy', { duration: 1, yPercent: -100, opacity: 0 }, 'anim4')
        .from('.section5-copy', { duration: 1, yPercent: 100, opacity: 0 }, 'anim4')
        ScrollTrigger.create({
            animation: anim4TL,
            trigger: '#section5',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 5 CAMERA
        ghostTL5
        .add('camera5')
        .to(position, { duration: ghostAnimDur, x: 3.863481129, y: 1.8987295479, z: -15.5522610782, onUpdate: webgiUpdate }, 'camera5')
        .to(target, { duration: ghostAnimDur, x: -0.0204389583, y: -0.149269659, z: -0.346106153 }, 'camera5')

        const ghostST5 = ScrollTrigger.create({
            animation: ghostTL5,
            trigger: '#section6',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        // SCENE 4 ANIMATION
        anim5TL
        .add('anim5')
        .to('.section5-copy', { duration: 1, yPercent: -100, opacity: 0 }, 'anim5')
        .from('.section6-copy', { duration: 1, yPercent: 100, opacity: 0 }, 'anim5')
        ScrollTrigger.create({
            animation: anim5TL,
            trigger: '#section6',
            start: 'top bottom',
            end: 'top top',
            scrub: true,
            immediateRender: false
        })
        
        // PARALLAX CODE
        // let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

        // const sections = document.querySelectorAll('.section');
        // sections.forEach((section, i) => {
        //     const sectionBG = section.querySelector(".bg") as HTMLElement

        //     // Give the backgrounds some random images
        //     // sectionBG.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
        
        //     // the first image (i === 0) should be handled differently because it should start at the very top.
        //     // use function-based values in order to keep things responsive
        //     gsap.fromTo(sectionBG,
        //     { 
        //         backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
        //     },
        //     { 
        //         backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        //         ease: "none",
        //         scrollTrigger: {
        //             trigger: section,
        //             start: () => i ? "top bottom" : "top top", 
        //             end: "bottom top",
        //             scrub: true,
        //             markers: true,
        //             invalidateOnRefresh: true // to make it responsive
        //         }
        //     })
        // })
    }

    initScrollAnimation()

    // WEBGI UPDATE
    let needsUpdate = true

    function webgiUpdate() {
        needsUpdate = true
        viewer.renderer.resetShadows()
        // viewer.setDirty()
    }

    viewer.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionUpdated(true)
            camera.targetUpdated(true)
            needsUpdate = false
        }
    })
}

setupViewer()
