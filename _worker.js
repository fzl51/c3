export default {
  async fetch(request, env) {
    function blobToB64(data) {
     

      // if (TextDecoder) {
      //   // Decode as UTF-8
      //   var dataView = new DataView(data);
      //   var decoder = new TextDecoder('utf8');
      //   return btoa(decoder.decode(dataView));
      // } else {
      // Fallback
      return btoa(new Uint8Array(data).reduce((data, byte) =>
              data + String.fromCharCode(byte),
          ''))
      // }
    }
    console.log(request);
    try {
      const OPENAI_API_HOST = "api.hotpot.ai";
      const oldUrl = new URL(request.url);

      if (oldUrl.pathname === "/") {
        return new Response(`new api.yy2169.com`, { status: 200 });
      }

      const newUrl = new URL(request.url);
      const queryParams = newUrl.searchParams;
      const type=queryParams.get('type');
      newUrl.hostname = OPENAI_API_HOST;

      const newHeaders = new Headers(request.headers);
      newHeaders.set("Authorization", "hotpot-t2mJbCr8292aQzp8CnEPaK");
      newHeaders.set("Api-Token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc3NjA0NzUsImV4cCI6MTcxNzg0Njg3NX0.1uF_hVcygVa_de7_616HJkPOVoZNl56zJ0yPRl7JMkE");
      const modifiedRequest = new Request(newUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
      });
      const modifiedResponse = await fetch(modifiedRequest);
      const originalHeaders = new Headers(modifiedResponse.headers);
      const sendString=type=='base64'?blobToB64((await modifiedResponse.arrayBuffer())):modifiedResponse.body;
      const customHeaders = new Headers({
        // "Access-Control-Allow-Origin": "*",
        "come": "aimei",
        // "content-length": `${base64String.length}`,
        // "Content-Type": "image/png",
        "Access-Control-Allow-Headers": "admin_name,admin_token,authorization,content-type,user_id",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      });
      return new Response( sendString
          , {
            status: modifiedResponse.status,
            statusText: modifiedResponse.statusText,
            headers: new Headers([...originalHeaders, ...customHeaders]),
          });
    } catch (e) {
      return new Response(e.stack, { status: 500 });
    }
  },
};
