export default defineEventHandler(async (event) => {
  const payload: any = await readBody(event);

  console.log('Payload:', payload);

  const newStatus = payload.new?.status;
  const oldStatus = payload.old?.status;

  console.log('newStatus', newStatus);
  console.log('oldStatus', oldStatus);

  return { message: 'Event processed' };
});
