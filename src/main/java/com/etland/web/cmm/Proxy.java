package com.etland.web.cmm;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import lombok.Data;

import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

@Component @Data @Lazy
public class Proxy {
	private int pageNum, pageSize, blockSize, startRow, 
		endRow, startPage, endPage, prevBlock, nextBlock, totalCount;
	private String search;
    private boolean existPrev, existNext;
    @Autowired Image img;

    public void carryOut(Map<?,?> paramMap) {

        // page_num, page_size, block_Size, total_count

        String _pageNum = (String) paramMap.get("page_num");
        pageNum = ((String) paramMap.get("page_num") == null) ? 1 : Integer.parseInt(_pageNum);

        String _pageSize = (String) paramMap.get("page_size");
        pageSize = ((String) paramMap.get("page_size") == null) ? 5 : Integer.parseInt(_pageSize);

        String _blockSize = (String) paramMap.get("block_size");
        blockSize = ((String) paramMap.get("block_Size") == null) ? 5 : Integer.parseInt(_blockSize);

        totalCount = (int)paramMap.get("total_count");

        int nmg = totalCount % pageSize;
        int pageCount = (nmg == 0) ? totalCount / pageSize : totalCount / pageSize + 1;


        startRow = (pageNum - 1) * pageSize; // MySQL 은 인덱스처리해서 +1 삭제

        endRow = (totalCount > pageNum * pageSize) ? pageNum * pageSize : totalCount;

        int blockNum = (pageNum-1)/blockSize;
		if(existPrev) {
			startPage = blockNum*blockSize+1;
			
		}else {
			startPage = 1;
		}
		endPage = startPage+(blockSize-1);
		startPage = pageNum -((pageNum-1)%blockSize);
		endPage = startPage+(blockSize-1);
		if(endPage>pageCount) {
			endPage = pageCount;
		}

        existPrev = (startPage - pageSize) > 0;
        existNext = (startPage + pageSize) <= pageCount;
        prevBlock = startPage - pageSize;
        nextBlock = startPage + pageSize;
        search = (String) paramMap.get("search");
    }
    public void fileUpload(String customerID) {
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024 * 40); // 40 MB
		upload.setSizeMax(1024 * 1024 * 50); // 50 MB
		List<FileItem> items = null;
		try {
			File file = null;
			// items = upload.parseRequest((RequestContext) new ServletRequestContext(request));
			Iterator<FileItem> it = items.iterator();
			while(it.hasNext()) {
				FileItem item = it.next();
				if(!item.isFormField()) {
					String fileName = item.getName();
					file = new File(""+fileName);
					item.write(file);
					img.setImgName(fileName.substring(0,fileName.indexOf(".")));
					img.setImgExtention(fileName.substring(fileName.indexOf(".")+1));
					img.setOwner(customerID);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
    }
}
