import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Copy,
  CopyCheck,
  Share2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const ShareCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      "Check out this election and cast your vote!"
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out this election and cast your vote! ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <Card className='bg-muted/10'>
      <CardContent>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-md bg-muted'>
              <Share2 />
            </div>
            <div>
              <h3 className='text-lg font-semibold'>Share this election</h3>
              <p className='text-sm text-muted-foreground'>
                Invite others to participate and make their voice heard
              </p>
            </div>
          </div>

          <div className='bg-muted/30 border-2 rounded-lg p-3 flex items-center gap-2'>
            <ExternalLink className='h-4 w-4 text-gray-400 flex-shrink-0' />
            <span className='text-sm truncate flex-1 font-mono'>
              {window.location.href}
            </span>
          </div>

          <div className='flex flex-col sm:flex-row gap-2'>
            <Button
              variant='default'
              size='sm'
              onClick={handleCopyToClipboard}
              className='grow'
            >
              {copied ? (
                <>
                  <CopyCheck className='h-4 w-4 mr-2' />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className='h-4 w-4 mr-2' />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              variant='secondary'
              size='sm'
              onClick={handleTwitterShare}
              className='grow bg-black hover:bg-black/80'
            >
              <svg
                className='h-4 w-4 mr-2'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
              Share on X
            </Button>

            <Button
              variant='secondary'
              size='sm'
              onClick={handleWhatsAppShare}
              className='grow bg-green-700 hover:bg-green-800'
            >
              <MessageCircle className='h-4 w-4 mr-2' />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareCard;
