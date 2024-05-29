package com.mfpe.claimsmicroservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mfpe.claimsmicroservice.dto.ClaimStatusDTO;
import com.mfpe.claimsmicroservice.exceptions.InvalidClaimIdException;
import com.mfpe.claimsmicroservice.model.Claim;
import com.mfpe.claimsmicroservice.repository.ClaimRepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ClaimStatusService {

	@Autowired
	private ClaimRepo claimRepo;
	
	public ResponseEntity<ClaimStatusDTO> getClaimStatus(String id) throws InvalidClaimIdException {
			log.info("inside getClaimStatus in service ");
			ClaimStatusDTO claimStatusDTO = new ClaimStatusDTO();
			
			Optional<Claim> claim = claimRepo.findHospitalIdByclaimId(id);
			String status = claim.get().getStatus();
			log.info("claim status retreived---->" + status);
			
			String desc = claim.get().getDescription();
			log.info("claim Description retreived---->" + desc);
			
			if (status == null) {
				throw new InvalidClaimIdException("Invalid Claim ID");
			}
			claimStatusDTO.setClaimStatus(status);
			claimStatusDTO.setClaimDescription(desc);
			claimStatusDTO.setClaimId(id);
			log.info("inside the get Claim Status : ENDED");
			return new ResponseEntity<>(claimStatusDTO, HttpStatus.OK);
	}

}
