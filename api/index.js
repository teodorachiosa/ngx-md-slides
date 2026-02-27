export default async (req, res) => {
  const { reqHandler } = await import('../dist/ngx-md-slides/server/server.mjs');
  return reqHandler(req, res);
};
