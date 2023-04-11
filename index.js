app.get('/screenshot', async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ message: 'URL missing' });
    }
  
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      await page.goto(url);
      const screenshotBuffer = await page.screenshot({ type: 'png' });
  
      await browser.close();
  
      res.set('Content-Type', 'image/png');
      res.send(screenshotBuffer);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
