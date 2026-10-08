export async function assertNoHorizontalOverflow(page){
  const dimensions=await page.evaluate(()=>({
    viewport:document.documentElement.clientWidth,
    documentWidth:document.documentElement.scrollWidth
  }));

  if(dimensions.documentWidth>dimensions.viewport+1){
    throw new Error(
      `Horizontal overflow: viewport=${dimensions.viewport}px, document=${dimensions.documentWidth}px`
    );
  }
}

export async function getBrokenImages(page){
  await page.waitForFunction(()=>
    Array.from(document.images).every(image=>image.complete)
  );

  return page.locator("img").evaluateAll(images=>
    images
      .filter(image=>image.naturalWidth===0)
      .map(image=>({
        src:image.currentSrc||image.src,
        alt:image.alt||""
      }))
  );
}

export async function getImagesMissingAlt(page){
  return page.locator("img").evaluateAll(images=>
    images
      .filter(image=>!image.hasAttribute("alt"))
      .map(image=>image.currentSrc||image.src)
  );
}